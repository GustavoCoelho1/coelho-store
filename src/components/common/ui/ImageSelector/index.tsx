import AddImageButton from './AddImageButton';
import ImageButton from './ImageButton';

export interface iImageData {
    link?: string;
    file?: File;
}

export interface SelectorProps {
    list: iImageData[];
    setList: (val: iImageData[]) => void;
}

const ImageSelector: React.FC<SelectorProps> = ({ list, setList }) => {
    return (
        <div className="w-full flex justify-center items-center flex-wrap">
            {list.map((image) => (
                <ImageButton
                    key={image.file ? image.file.name : image.link}
                    list={list}
                    setList={setList}
                    image={image}
                />
            ))}
            <AddImageButton list={list} setList={setList} />
        </div>
    );
};

export default ImageSelector;
