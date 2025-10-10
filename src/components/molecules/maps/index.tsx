'use client';

import { Button } from '@/components/atoms';
import { cn } from '@/shared/utils';
import Feature from 'ol/Feature';
import Map from 'ol/Map';
import View from 'ol/View';
import Point from 'ol/geom/Point';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import 'ol/ol.css';
import { fromLonLat, toLonLat } from 'ol/proj';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import Icon from 'ol/style/Icon';
import Style from 'ol/style/Style';
import { useCallback, useEffect, useRef, useState } from 'react';
import InputTextSearch from '../input/search';
import { ILonLat, MapsProps } from './maps';

export const Maps = ({
  position = [-7.449554, 112.711726],
  zoom = 12,
  className,
  setChoosenLocation,
  choosenLocation,
}: MapsProps) => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  const [searchResults, setSearchResults] = useState<ILonLat[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>();
  const [location, setLocation] = useState<ILonLat>();

  const mapInstanceRef = useRef<Map | null>(null);
  const vectorSourceRef = useRef<VectorSource | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const initialCoord = fromLonLat([
      Number((location || choosenLocation)?.lon ?? position[1]),
      Number((location || choosenLocation)?.lat ?? position[0]),
    ]);

    const vectorSource = new VectorSource();
    vectorSourceRef.current = vectorSource;

    const marker = new Feature({ geometry: new Point(initialCoord) });
    marker.setStyle(
      new Style({
        image: new Icon({
          src: '/assets/icons/pin-red-sized.svg',
          height: 50,
          width: 50,
          anchor: [0.5, 1],
        }),
      }),
    );
    vectorSource.addFeature(marker);

    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });

    const map = new Map({
      target: mapRef.current,
      layers: [new TileLayer({ source: new OSM() }), vectorLayer],
      view: new View({
        center: initialCoord,
        zoom,
      }),
    });

    mapInstanceRef.current = map;

    map.on('click', (e) => {
      const [lon, lat] = toLonLat(e.coordinate);

      const nominatimUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`;

      fetch(nominatimUrl)
        .then((response) => response.json())
        .then((data) => {
          if (data?.display_name) {
            setLocation({
              lon: String(lon),
              lat: String(lat),
              display_name: data?.display_name,
            });
          } else {
            console.log('No address found for these coordinates.');
          }
        })
        .catch((error) => {
          console.error('Error during reverse geocoding:', error);
        });
    });

    return () => {
      map.setTarget(undefined);
      mapInstanceRef.current = null;
      vectorSourceRef.current = null;
    };
  }, [zoom, position, choosenLocation, location]);

  const searchLocation = useCallback(async (keyword?: string) => {
    if (!keyword || keyword.length < 3) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(keyword)}&format=json&limit=10`,
      );
      if (!response.ok) throw new Error('Gagal mengambil data dari Nominatim');

      const json: ILonLat[] = await response.json();
      setSearchResults(
        json?.map((e) => ({ lon: e.lon, lat: e.lat, display_name: e.display_name, name: e.name })),
      );
    } catch (error) {
      console.error('Nominatim search error:', error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    searchLocation(search);
  }, [search, searchLocation]);

  return (
    <div
      ref={mapRef}
      className={cn(className, 'w-full h-[400px] rounded-xl overflow-hidden shadow-md relative')}
    >
      {setChoosenLocation && (
        <>
          <div className="absolute z-[10] w-full left-1/2 top-2 -translate-x-1/2 text-white px-4 py-2">
            <InputTextSearch
              delayDebounce={1000}
              useSuggestion
              search={search || ''}
              setSearch={setSearch}
              placeholder="Cari lokasi saya"
              loadingSuggestion={loading}
            >
              {searchResults.map((e, i) => (
                <div
                  key={`search-${i}`}
                  className="flex items-center gap-2 py-2 cursor-pointer hover:bg-gray-100 text-black px-4"
                  onClick={() => {
                    const lat = parseFloat(e.lat);
                    const lon = parseFloat(e.lon);
                    setLocation({
                      display_name: e.display_name,
                      lat: String(lat),
                      lon: String(lon),
                    });
                  }}
                >
                  {e.display_name}
                </div>
              ))}
            </InputTextSearch>
          </div>
          {(location || choosenLocation) && (
            <div className="absolute bottom-0 left-1/2 w-full -translate-x-1/2 z-10 bg-white box-shadow px-4 py-2 space-y-2">
              <div>
                {(location || choosenLocation)?.name && (
                  <p className="font-bold text-sm">{(location || choosenLocation)?.name}</p>
                )}
                <p className="text-sm">{(location || choosenLocation)?.display_name}</p>
              </div>
              <Button
                onClick={() => {
                  setLocation(undefined);
                  setChoosenLocation(location || choosenLocation!);
                }}
              >
                Pilih Lokasi
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
