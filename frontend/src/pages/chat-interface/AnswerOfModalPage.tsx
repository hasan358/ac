import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoremPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white p-8 flex flex-col gap-6">
      {/* Lorem Ipsum Text (200 words) */}
      <p className="text-gray-800 text-2xl leading-relaxed px-50">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim v
        eniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
         Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
         Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, 
          totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. 
          Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, 
          sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. 
          Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, 
          sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt animi nihil rem itaque dolor eum sed vitae cum optio ab consectetur natus labore i
        usto pariatur eaque, incidunt laborum nemo ipsam.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam sapiente veniam distinctio provident! Debitis, eos. Eveniet quidem illum eligendi quibusdam neque illo aperiam iste accusamus, sit maiores eius rem, dolorum quis voluptatem consequuntur. Ex facilis velit vitae quo, ipsam excepturi incidunt possimus modi! Vitae nesciunt ducimus voluptas doloribus. Perferendis quis maiores sequi, corporis voluptatum nam illo id fugit nisi accusantium quia ipsum, beatae ducimus perspiciatis dicta voluptas. Dignissimos modi soluta quibusdam quidem, laboriosam ipsam eius vel iusto voluptatum. Quidem, quas!
      </p>

      {/* Back Button */}
      <div className="flex justify-end mr-50 mt-10">
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 rounded-md border border-blue-500 text-blue-600 hover:bg-blue-50 transition"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default LoremPage;