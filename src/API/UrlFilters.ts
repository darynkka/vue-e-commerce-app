import {  watch } from 'vue'
import { useRouter } from 'vue-router'
import type { Ref } from 'vue'

export function useUrlFilters(searchName: Ref<string>, selectedCategory: Ref<string>, priceFrom: Ref<string>, priceTo: Ref<string>, handleFilters: () => void) {
  const router = useRouter()

  // функція для отримання параметрів з URL і встановлення фільтрів
  const loadFiltersFromURL = () => {
    const queryParams = router.currentRoute.value.query

    searchName.value = queryParams.name ? (queryParams.name as string) : ''
    selectedCategory.value = queryParams.category
      ? (queryParams.category as string)
      : ''
    priceFrom.value = queryParams.from ? (queryParams.from as string) : ''
    priceTo.value = queryParams.to ? (queryParams.to as string) : ''

    handleFilters()
  }

  // функція для слідкування за змінами в URL
  const watchURLParams = () => {
    watch(
      () => router.currentRoute.value.query,
      newQuery => {
        searchName.value = newQuery.name ? (newQuery.name as string) : ''
        selectedCategory.value = newQuery.category
          ? (newQuery.category as string)
          : ''
        priceFrom.value = newQuery.from ? (newQuery.from as string) : ''
        priceTo.value = newQuery.to ? (newQuery.to as string) : ''

        handleFilters()
      }
    )
  }
  // функція для оновлення запитів у URL
  const updateQueryParams = () => {
    router.replace({
      path: '/',
      query: {
        name: searchName.value || undefined,
        category: selectedCategory.value || undefined,
        from: priceFrom.value || undefined,
        to: priceTo.value || undefined,
      },
    })
  }

  return { loadFiltersFromURL, watchURLParams, updateQueryParams }
}