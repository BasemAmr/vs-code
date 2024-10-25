
interface IconImgProps extends React.HTMLProps<HTMLImageElement> {
    src: string
}

const IconImg = ({ src }: IconImgProps) => {
    return (
        <>
            <img src={src} alt="icon" style={{
                height: '10px',
                width: '10px',
                display: 'inline',
            }} />
        </>
    )
}

export default IconImg