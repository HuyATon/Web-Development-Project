let blackList = new Set()

module.exports = {
    blackList:  blackList,
    addToBlackList: (token) => {
        blackList.add(token)
    }
}