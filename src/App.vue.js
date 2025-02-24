import { getPhotos, searchPhotos } from "@/services/service";
import ImageModal from "@/components/ImageModal.vue";
export default (await import('vue')).defineComponent({
    components: {
        ImageModal,
    },
    data() {
        return {
            photos: [],
            searchQuery: "",
            selectedPhoto: null,
            isModalVisible: false,
            loading: true,
            showSearchResults: false, 
        };
    },
    async created() {
        await this.fetchLatestPhotos();
    },
    methods: {
        async fetchLatestPhotos() {
            try {
                this.loading = true;
                this.photos = await getLatestAfricanPhotos();
            }
            catch (error) {
                console.error("Error fetching photos:", error);
            }
            finally {
                this.loading = false;
                this.showSearchResults = false; 
            }
        },
        async handleSearch() {
            if (!this.searchQuery.trim()) {
                await this.fetchLatestPhotos();
                return;
            }
            try {
                this.loading = true;
                this.photos = await searchPhotos(this.searchQuery);
                this.showSearchResults = true; 
            }
            catch (error) {
                console.error("Error searching photos:", error);
            }
            finally {
                this.loading = false;
            }
        },
        openModal(photo) {
            this.selectedPhoto = photo;
            this.isModalVisible = true;
        },
        closeModal() {
            this.isModalVisible = false;
            this.selectedPhoto = null;
        },
    },
});
;
function __VLS_template() {
    const __VLS_ctx = {};
    const __VLS_localComponents = {
        ...{
            ImageModal,
        },
        ...{},
        ...__VLS_ctx,
    };
    let __VLS_components;
    const __VLS_localDirectives = {
        ...{},
        ...__VLS_ctx,
    };
    let __VLS_directives;
    let __VLS_styleScopedClasses;
    __VLS_styleScopedClasses['photo-card'];
    // CSS variable injection 
    // CSS variable injection end 
    let __VLS_resolvedLocalAndGlobalComponents;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("landing-page") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("search-bar") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.input)({ ...{ onKeyup: (__VLS_ctx.handleSearch) }, type: ("text"), value: ((__VLS_ctx.searchQuery)), placeholder: ("Search for photos"), });
    if (__VLS_ctx.showSearchResults) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("search-results") }, });
        __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
        (__VLS_ctx.searchQuery);
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("photo-grid") }, });
    if (__VLS_ctx.loading) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("loading-placeholder-grid") }, });
        for (const [n] of __VLS_getVForSourceType((9))) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ key: ((n)), ...{ class: ("photo-skeleton") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("skeleton-image") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("skeleton-details") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("skeleton-text") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("skeleton-text short") }, });
        }
    }
    else {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        for (const [photo] of __VLS_getVForSourceType((__VLS_ctx.photos))) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ onClick: (...[$event]) => {
                        if (!(!((__VLS_ctx.loading))))
                            return;
                        __VLS_ctx.openModal(photo);
                    } }, key: ((photo.id)), ...{ class: ("photo-card") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.img)({ src: ((photo.urls.regular)), alt: ((photo.description)), });
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("photo-details") }, });
            __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
            (photo.user.name);
            __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
            (photo.user.location);
        }
    }
    const __VLS_0 = __VLS_resolvedLocalAndGlobalComponents.ImageModal;
    /** @type { [typeof __VLS_components.ImageModal, ] } */
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ ...{ 'onClose': {} }, imageSrc: ((__VLS_ctx.selectedPhoto?.urls.full)), visible: ((__VLS_ctx.isModalVisible)), }));
    const __VLS_2 = __VLS_1({ ...{ 'onClose': {} }, imageSrc: ((__VLS_ctx.selectedPhoto?.urls.full)), visible: ((__VLS_ctx.isModalVisible)), }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    let __VLS_6;
    const __VLS_7 = {
        onClose: (__VLS_ctx.closeModal)
    };
    let __VLS_3;
    let __VLS_4;
    const __VLS_5 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2);
    __VLS_styleScopedClasses['landing-page'];
    __VLS_styleScopedClasses['search-bar'];
    __VLS_styleScopedClasses['search-results'];
    __VLS_styleScopedClasses['photo-grid'];
    __VLS_styleScopedClasses['loading-placeholder-grid'];
    __VLS_styleScopedClasses['photo-skeleton'];
    __VLS_styleScopedClasses['skeleton-image'];
    __VLS_styleScopedClasses['skeleton-details'];
    __VLS_styleScopedClasses['skeleton-text'];
    __VLS_styleScopedClasses['skeleton-text'];
    __VLS_styleScopedClasses['short'];
    __VLS_styleScopedClasses['photo-card'];
    __VLS_styleScopedClasses['photo-details'];
    var __VLS_slots;
    var __VLS_inheritedAttrs;
    const __VLS_refs = {};
    var $refs;
    return {
        slots: __VLS_slots,
        refs: $refs,
        attrs: {},
    };
}
;
let __VLS_self;
