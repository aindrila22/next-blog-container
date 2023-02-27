import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";

export interface Props {
  userId: number;
  id: number;
  title: string;
  body: string;
}
interface DataProps {
  data: Props;
}
const Post = ({ data }: DataProps) => {
  return (
    <div className="grid grid-cols-1 lg:w-7/12 w-11/12 mx-auto my-6 gap-6 font-raleway lg:shadow lg:p-20 px-4">
      <Link href="/" className="text-lg underline underline-offset-2 font-bold">
        BACK
      </Link>
      <div className="text-5xl text-lime-600 text-center font-bold my-5">
        Blog {data.id}
      </div>
      <div className="py-10 text-3xl text-slate-700 ">
        <b>Title :</b>
        {data.title}
      </div>
      <div className="text-2xl text-slate-600 leading-relaxed">{data.body}</div>
    </div>
  );
};

export default Post;

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=10"
  );
  const data = await res.json();
  const paths = data.map((element: Props) => {
    return {
      params: {
        post: element.id.toString(),
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.post;
  const result = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  const data = await result.json();

  return {
    props: {
      data,
    },
  };
};
