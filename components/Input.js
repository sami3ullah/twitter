import React from 'react';
import { useState, useRef } from 'react';

// firebase functions import
import { db, storage } from "../firebase";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc
} from "@firebase/firestore";
import { getDownloadURL, ref, uploadString } from "@firebase/storage";

import { CalendarIcon, ChartBarIcon, EmojiHappyIcon, PhotographIcon, XIcon } from '@heroicons/react/outline';
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";


function Input() {
    const [input, setInput] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [showEmojis, setShowEmojis] = useState(false);
    const [loading, setLoading] = useState(false);
    const fileRefPicker = useRef(null);
    
    const sendPost = async () => {
        if (loading) return;
        setLoading(true);

        const docRef = await addDoc(collection(db, "tweets"), {
          // id: session.user.id,
          // username: session.user.name,
          // userImg: session.user.image,
          // tag: session.user.tag,
          text: input,
          timestamp: serverTimestamp(),
        });

        const imageRef = ref(storage, `tweets/${docRef.id}/image`);

        // get the selected image file, upload to firebase storage & update the tweets
        // document with the URL of the image
        if (selectedFile) {
            await uploadString(imageRef, selectedFile, "data_url").then(async () => {
                const downloadURL = await getDownloadURL(imageRef);
                await updateDoc(doc(db, "tweets", docRef.id), {
                    image: downloadURL
                });
            });
        }

        // resetting states
        setLoading(false);
        setInput("");
        setSelectedFile(null);
        setShowEmojis(false);

    };
    const addImageToPost = () => { };
    const addEmoji = (e) => {
        // get the unicode of the emoji
        let sym = e.unified.split("-");
        let codesArray = [];
        // append 0x to each code to make it right
        sym.forEach((el) => { codesArray.push("0x" + el); });
        // making an emoji as a text from unicode
        let emoji = String.fromCodePoint(...codesArray);
        // adding emoji to the input
        console.log(emoji);
        setInput(input + emoji);
        
    };


    return (
      <div
        className={`border-b border-gray-700 p-3 flex space-x-3 overflow-y-scroll`}
      >
        <img
          className="h-11 w-11 rounded-full cursor-pointer"
          src="https://yt3.ggpht.com/yti/APfAmoFyA5COiJxi4itHrK9Zpip-iyc0nMPPgWFITZqAtFA=s88-c-k-c0x00ffffff-no-rj-mo"
        />

        <div className="w-full divide-y divide-gray-700">
          <div className={`${selectedFile && "pb-7"} ${input && "space-y-2.5"}}`}>
            <textarea
            onChange={(e) => setInput(e.target.value)}
            value={input}
            name=""
            id=""
            cols="30"
            rows="2"
            placeholder="What's happening?"
            className="bg-transparent outline-none text-[#d9d9d9] text-lg placeholder-gray-500 min-h-[50px] tracking-wide w-full"
            ></textarea>
          </div>

          {selectedFile && (
            <div className="relative">
              <div
                className="absolute w-8 h-8 bg-[#15181c] hover:bg-[#272c26] bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 cursor-pointer"
                onClick={() => setSelectedFile(null)}
              >
                <XIcon className="text-white h-5" />
              </div>
              <img
                src="{selectedFile}"
                alt="tweet image"
                className="rounded-2xl max-h-80 object-contain"
              />
            </div>
          )}
          <div className="flex items-center justify-between pt-2.5 ">
            <div className="flex items-center">
                <div
                className="icon"
                onClick={() => fileRefPicker.current.click()}
                >
                    <label title="image">            
                        <PhotographIcon className="h-[22px] text-[#1d9bf0]" />
                    </label>
                    <input
                    type="file"
                    onChange={addImageToPost}
                    ref={fileRefPicker}
                    hidden
                    />
                </div>
                <div className="icon rotate-90">
                    <label title="Poll">
                        <ChartBarIcon className="text-[#1d9bf0] h-[22px]" />
                    </label>       
                </div>
                <div className="icon" onClick={() => setShowEmojis(!showEmojis)}>
                    <label title="emoji">            
                        <EmojiHappyIcon className="text-[#1d9bf0] h-[22px]" />
                    </label>
                </div>
                <div className="icon">
                    <label title="Schedule">           
                        <CalendarIcon className="text-[#1d9bf0] h-[22px]" />
                    </label>
              </div>

              {showEmojis && (
                <Picker
                  onSelect={addEmoji}
                  style={{
                    position: "absolute",
                    marginTop: "465px",
                    marginLeft: "-40",
                    maxWidth: "320px",
                    borderRadius: "20px",
                  }}
                  theme="dark"
                />
              )}
            </div>
                <button className='bg-[#1d9bf0] text-white rounded-full px-4 py-1.5 font-bold
                cursor-pointer shadow-md hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0]
                disabled:opacity-50 disabled:cursor-default'
                disabled={!input.trim() && !selectedFile} onClick={sendPost}>Tweet</button>
          </div>
        </div>
      </div>
    );
}

export default Input;
