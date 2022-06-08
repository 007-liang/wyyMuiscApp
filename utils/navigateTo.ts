export const to_music_library = (id: string) => {
    wx.navigateTo({
        url: `/pages/music-library/music-library?id=${id}`
    })
};

export const to_search_page = () => {
    wx.navigateTo({
        url: "/pages/search/search"
    })
};

export const to_song_detail = (id: string | number) => {
    wx.navigateTo({
        url: `/pages/songDetail/songDetail?id=${id}`
    })
}