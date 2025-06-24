export interface ImportData {
    file: File | null,
    endpoint: string,
}

export interface ImportStore {
    data: ImportData;
    loading: boolean;
    setData: (data: ImportData) => void;
    upload: () => Promise<any>;
}
