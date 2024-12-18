/**
 * 패치 정보 조회 API
 *
 * @async
 * @param {string} query - 없음
 * @returns {unknown} - ex) { modelName: "CL300", manufactureNumber: "CMK100K", firmwareVersion: "1.0.0" }
 */
async function getPatchInfo() {
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log("🚀 ~ delay 2 seconds")
    return { modelName: "CL300", manufactureNumber: "CMK100K", firmwareVersion: "1.0.0" }
  } catch (error) {
    console.error("Error fetching notice:", error)
    throw error
  }
}
export { getPatchInfo }
