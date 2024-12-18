/**
 * 의료기기 허가정보 조회 API
 *
 * @async
 * @param {string} query - 없음
 * @returns {unknown} - ex) {
      itemName: "케어레보",
      modelName: "CL300",
      manufacturer: "케어메디",
      mfrAddress: "서울 영등포구 양평로25길 8 7층",
      apprNumber: "제허 1호",
      ifu: "",
      version: "1.1.0.9",
      manufactureDate: "2024.12",
    }
 */
async function getPermissionInfo() {
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log("🚀 ~ delay 2 seconds")
    return {
      itemName: "케어레보",
      modelName: "CL300",
      manufacturer: "케어메디",
      mfrAddress: "서울 영등포구 양평로25길 8 7층",
      apprNumber: "제허 1호",
      ifu: "",
      version: "1.1.0.9",
      manufactureDate: "2024.12",
    }
  } catch (error) {
    console.error("Error fetching notice:", error)
    throw error
  }
}
export { getPermissionInfo }
