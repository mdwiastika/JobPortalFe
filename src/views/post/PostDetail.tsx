import { useParams } from "react-router-dom";

export default function PostDetail() {
  const { slug } = useParams<{ slug: string }>();
  return (
    <div>
      <h2>Ini adalah halaman detail post {slug}</h2>
    </div>
  );
}
