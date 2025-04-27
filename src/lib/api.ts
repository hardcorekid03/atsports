import type { ApiResponse } from "./types"


export async function fetchStreams(): Promise<ApiResponse> {
  try {
    const proxyUrl = "https://api.allorigins.win/get?url=" + encodeURIComponent("https://ppv.wtf/api/streams")
    const response = await fetch(proxyUrl)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const wrapped = await response.json()
    const data: ApiResponse = JSON.parse(wrapped.contents) // unwrap the response

    return data
  } catch (error) {
    console.error("Failed to fetch streams:", error)
    return {
      success: false,
      timestamp: Date.now(),
      READ_ME: "Failed to fetch data from the API.",
      performance: 0,
      streams: [],
    }
  }
}
