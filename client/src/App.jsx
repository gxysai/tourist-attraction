import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import "./index.css";

function App() {
  const [search, setSearch] = useState([]);

  const getSearch = async (input) => {
    try {
      const res = await axios.get(
        `http://localhost:4001/trips?keywords=${input}`
      );
      console.log(res.data.data);
      setSearch(res.data.data);
    } catch (error) {
      console.log("request error");
    }
  };

  useEffect(() => {
    getSearch("");
  }, []);

  const handleInputChange = (e) => {
    e.preventDefault();
    getSearch(e.target.value);
  };

  return (
    <>
      <div className="text-sky-300 w-96 text-center m-auto mt-8 p-10 text-5xl font-kanit">
        <h1>เที่ยวไหนดี</h1>
      </div>
      <div className="w-2/4 text-center m-auto font-kanit">
        <h2>ค้นหาที่เที่ยว</h2>
      </div>

      <div className="flex items-center justify-center ">
        <input
          className="w-2/4 m-auto text-center border-b border-gray-500 mt-10 font-kanit"
          type="text"
          placeholder="หาที่เที่ยวแล้วไปกัน ..."
          onChange={handleInputChange}
        />
      </div>
      {search.map((item, index) => (
        <div key={index} className="flex my-12 m-auto w-9/12 mb-12">
          {item.photos.slice(0, 1).map((photo, index) => (
            <>
              <img
                className="flex w-64 h-64 rounded-2xl"
                key={index}
                src={photo}
                alt="trip"
                width="150px"
                height="150px"
              />
              <div className="flex flex-col ml-4">
                <h3 className="text-2xl font-bold font-kanit">{item.title}</h3>
                <p className="text-xl">
                  {item.description.length > 100
                    ? item.description.substring(0, 100) + "..."
                    : postMessage.description}
                </p>
                <a href={item.url} className="text-sky-500 font-kanit">
                  อ่านต่อ...
                </a>

                <div className="flex flex-row space-x-2">
                  <span className="space-x-4">
                    <span className="mr-2">หมวด</span>
                    {item.tags.map((tag, index) => (
                      <button
                        key={index}
                        className="text-grey-500 underline font-kanit"
                      >
                        {tag}
                      </button>
                    ))}
                  </span>
                </div>

                <br />
                <div className="flex flex-row">
                  {item.photos.slice(1, 4).map((photo, index) => (
                    <img
                      key={index}
                      src={photo}
                      alt="trip"
                      className="flex flex-column mr-5 w-32 h-32 rounded-2xl"
                      width="100px"
                      height="100px"
                    />
                  ))}
                </div>
              </div>
            </>
          ))}
        </div>
      ))}
    </>
  );
}

export default App;
