export interface ITweet {
    id: number,
    user: {
        name: string,
        screen_name: string,
        profile_image_url: string
    },
    text: string,
    created_at: string
}