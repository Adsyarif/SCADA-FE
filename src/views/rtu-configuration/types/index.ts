export type RtuConfiguration = {
    id: string;
    rtuEngineId: string;
    rtuName: string;
    latitude: number;
    longitude: number;
    radius: number;
}

export type PaginatedRtus = {
    data: RtuConfiguration[];
    total: number;
    page: number;
    limit: number;
}