import { useNavigate } from "react-router-dom"

export const ReviewForm = () => {
    const {bookId} = useParams()

    const initialReviewState = {
        book: bookId,
        rating: null,
        comment: ""
    }

    const [review, updateReviewProps] = useState(initialReviewState)
    const navigate = useNavigate()

    return
}