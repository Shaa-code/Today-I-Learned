import { getEmotionImage } from "../util/get-emotion-image";
import "./EmotionItem.css";

const EmotionItem = ({ emotionId, text, isSelected, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`emotionItem ${isSelected ? `emotionItem${emotionId}` : ""} `}
    >
      <img className="emotion_img" src={getEmotionImage(emotionId)} />
      <div className="emotion_name">{text}</div>
    </div>
  );
};

export default EmotionItem;
