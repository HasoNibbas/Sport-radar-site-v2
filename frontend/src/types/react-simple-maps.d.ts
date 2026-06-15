declare module 'react-simple-maps' {
    import { ReactNode } from 'react';

    export interface GeographyProps {
        geography: any;
        fill?: string;
        stroke?: string;
        strokeWidth?: number;
        style?: React.CSSProperties;
        className?: string;
        onClick?: (event: any) => void;
    }

    export interface MarkerProps {
        coordinates: [number, number];
        children?: ReactNode;
    }

    export interface ComposableMapProps {
        projection?: string;
        projectionConfig?: {
            center?: [number, number];
            scale?: number;
        };
        children?: ReactNode;
    }

    export interface GeographiesProps {
        geography: string;
        children: (props: { geographies: any[] }) => ReactNode;
    }

    export const ComposableMap: React.FC<ComposableMapProps>;
    export const Geographies: React.FC<GeographiesProps>;
    export const Geography: React.FC<GeographyProps>;
    export const Marker: React.FC<MarkerProps>;
} 