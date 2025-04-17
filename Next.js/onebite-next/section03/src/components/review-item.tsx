import style from "./review-item.module.css";
import { ReviewData } from "@/types";

export default function ReviewItem({
  id,
  content,
  author,
  createdAt,
  bookId,
}: ReviewData) {
  return (
    <div>
      <div>{style.author}</div>
      <div>{style.content}</div>
      <div className={style.bottom_container}>
        <div className={style.date}>
          <div>{new Date(createdAt).toLocaleString()}</div>
        </div>
        <div className={style.delete_btn}>삭제하기</div>
      </div>
    </div>
  );
}
