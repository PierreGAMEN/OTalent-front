export default interface TrainingDataI {
    averageRating: number;
    category: {
        label: string;
        id: string;
    };
    description: string;
    dates: string[];
    duration: number;
    excerpt: string;
    id: string;
    image: string;
    label: string;
    prerequisites: string;
    price: number;
    program: string;
    organization: {
        image: string;
        name: string;
        id: string;
        url_site: string;
        email: string;
    };
    reviews: {
        comment: string;
        id: string;
        created_at: string;
        member: {
            id: string;
            firstname: string;
            lastname: string;
            avatar: string;
        };
        rating: number;
    }[];
}
