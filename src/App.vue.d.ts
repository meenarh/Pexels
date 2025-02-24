declare const _default: import("vue").DefineComponent<{}, {}, {
    photos: never[];
    searchQuery: string;
    selectedPhoto: null;
    isModalVisible: boolean;
    loading: boolean;
    showSearchResults: boolean;
}, {}, {
    fetchLatestPhotos(): Promise<void>;
    handleSearch(): Promise<void>;
    openModal(photo: any): void;
    closeModal(): void;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {
    ImageModal: import("vue").DefineComponent<{}, {}, any>;
}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
