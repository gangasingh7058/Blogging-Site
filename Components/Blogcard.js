import Image from "next/image";
import blogimage from '../Images/bloglogo.png'

export default function BlogCard({ author, date, title, content,onClick  }) {

    date=formatDate(date);
  return (
    <section onClick={onClick} className="w-full space-y-8 flex justify-between py-6">
      <div className=" w-[80%]">
        {/* Top Part */}
        <div className="flex space-x-3 mb-4">
          <div>{author}</div>
          <div className="text-zinc-500">{date}</div>
        </div>

        {/* Main content */}
        <div className="space-y-4 mb-8">
          <div className="title text-4xl font-bold font-mono">{title}</div>
          <div className="content text-zinc-600 text-xl">{content}</div>
        </div>

        {/* Footer */}
        {/* <div>Footer</div> */}
      </div>
      <div className="flex justify-center items-center align-middle">
        <Image
          src={blogimage}
          alt="Image description" 
          width={200} 
          height={200} 
        />
      </div>
    </section>
  );
}

function formatDate(inputDate) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(inputDate);
    
    // Format the date to "DD Month, YYYY"
    return date.toLocaleDateString('en-US', options);
}



























