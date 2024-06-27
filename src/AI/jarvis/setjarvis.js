import React, { useState, useEffect } from 'react';
import { FaMicrophone } from 'react-icons/fa';
import { ReactMediaRecorder } from 'react-media-recorder-2';
import { saveAs } from 'file-saver';

const Popup = ({ isOpen, onClose }) => {
  const [recordings, setRecordings] = useState([]);
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    const originalConsoleError = console.error;

    console.error = (...args) => {
      if (args[0]?.includes('There is already an encoder stored which handles exactly the same mime types')) {
        return;
      }
      originalConsoleError(...args);
    };

    return () => {
      console.error = originalConsoleError;
    };
  }, []);

  if (!isOpen) return null;

  const handleStop = (blobUrl, blob) => {
    const fileName = `recording-${recordings.length + 1}.webm`;
    saveAs(blob, fileName);
    setRecordings((prev) => [...prev, blob]);
    setIsRecording(false);
  };

  const startRecordingHandler = (startRecording, stopRecording) => {
    if (recordings.length < 100) {
      setIsRecording(true);
      startRecording();
      setTimeout(() => {
        stopRecording();
      }, 3000); // Record for 2 seconds
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="popup-content p-6 rounded-lg w-3/4 max-w-lg relative flex flex-col items-center">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="flex flex-col items-center">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/location-tr-f72c5.appspot.com/o/1tSV6eAWolfqiP1zrI1wrcMwVas1%2Fgen_saved_images%2F856442944279.jpg?alt=media&token=d009c3fe-f45d-4286-b688-cb3f18d7e3da"
            alt="Setup Illustration"
            className="w-24 h-24 mb-4 rounded-lg"
          />
          <h1 className="text-2xl font-bold flex items-center mb-4 text-white">
            <FaMicrophone className="mr-2" /> Set Up Jarvis Now
          </h1>
          <p className="text-blue-300 mb-4 text-center">
            We need at least 100 recordings of you saying "Hey Jarvis" for 2 seconds each to train
            the model on your voice and accurately detect the wake word.
          </p>
          <ReactMediaRecorder
            audio
            onStop={handleStop}
            key={Math.random().toString(36).substr(2, 9)}
            shouldReset={true}
            render={({ startRecording, stopRecording }) => (
              <>
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 disabled:bg-gray-400 mb-4"
                  onClick={() => startRecordingHandler(startRecording, stopRecording)}
                  disabled={isRecording || recordings.length >= 100}
                >
                  {isRecording ? 'Recording...' : 'Start Recording'}
                </button>
                {isRecording && <div className="loader mb-4"></div>}
              </>
            )}
          />
          <p className="text-gray-300">Recordings: {recordings.length} / 100</p>
        </div>
      </div>
    </div>
  );
};

export default Popup;
