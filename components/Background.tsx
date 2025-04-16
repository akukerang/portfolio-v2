import Image from "next/image";
const Background = () => {
    return (
        <Image
            src="https://raw.githubusercontent.com/KDE/plasma-workspace-wallpapers/refs/heads/master/Mountain/contents/images_dark/5120x2880.png"
            quality={75}
            alt="Background Image"
            fill
            placeholder="blur"
            blurDataURL="https://raw.githubusercontent.com/KDE/plasma-workspace-wallpapers/refs/heads/master/Mountain/contents/images_dark/5120x2880.png"
            sizes="100vw"
            className="object-cover object-center absolute top-0 left-0 w-full h-full -z-10"
        />
    );
};
export default Background;