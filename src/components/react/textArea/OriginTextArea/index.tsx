import AudioButton from '@assets/audio.svg';
import ClearButton from '@assets/clear.svg';
import CopyButton from '@assets/copy.svg';
import ToolTipButton from '@components/react/ToolTipButton';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import type { ContentType } from 'src/types/translations';
import styles from '../TextArea.module.css';

type OriginTextAreaProps = {
  value: string;
  content: ContentType;
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
  maxLength: number;
  handleChange: (value: string, fromClear?: boolean) => void;
};

const OriginTextArea: React.FC<OriginTextAreaProps> = ({
  value,
  content,
  textareaRef,
  maxLength,
  handleChange,
}) => {
  const [count, setCount] = useState(0);

  const handleClear = () => {
    if (textareaRef.current) textareaRef.current.value = '';
    handleChange('', true);
    setCount(0);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(textareaRef.current?.value || '');
  };

  // const handleAudioPlay = () => {
  //   // TODO: audio play
  //   console.log("audio play");
  // };

  useEffect(() => {
    setCount(value.length);
  }, [value]);

  return (
    <div className="w-full">
      <label
        htmlFor={`origin_textarea`}
        className="block w-fit font-bold text-white"
      >
        {content.textarea.origin.label}
      </label>
      <div className="relative mt-1 flex h-[150px] flex-col rounded-[8px] bg-white has-focus-within:outline-2 has-focus-within:outline-black md:h-[200px]">
        <textarea
          id={`origin_textarea`}
          ref={textareaRef}
          placeholder={content.textarea.origin.placeholder}
          onChange={(event) => handleChange(event.target.value)}
          maxLength={maxLength}
          className={clsx(
            styles.textarea,
            'placeholder:text-gray w-full flex-1 resize-none p-2 pr-[28px] focus:outline-none',
          )}
          value={value}
        />
        <img
          src={ClearButton.src}
          alt=""
          className="absolute top-2 right-2 cursor-pointer"
          onClick={handleClear}
        />
        <div className="my-2 flex h-[24px] items-center gap-4 px-2">
          <ToolTipButton disabled>
            <img src={AudioButton.src} alt="" className="size-[20px]" />
          </ToolTipButton>
          <ToolTipButton
            text={content.textarea.origin.copy.hover}
            onClick={handleCopy}
            clickedText={content.textarea.origin.copy.clicked}
          >
            <img src={CopyButton.src} alt="" className="size-[20px]" />
          </ToolTipButton>
          <div className="text-small flex-1 text-right leading-[20px]">
            <span
              className={
                textareaRef.current &&
                textareaRef.current.value.length >= maxLength
                  ? 'text-error'
                  : ''
              }
            >
              {count}
            </span>
            <span>/{maxLength}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OriginTextArea;
