import Image from 'next/image'

const Title = () => {
    return (
        <div className="mb-4 flex justify-center items-center space-x-4">
            <h1 className="text-center text-yellow-500 text-5xl font-black">PayBanano</h1>
            <img className="block" src="/banano.svg" height={45} width={45} alt="banano logo" />
        </div>
    )
};

export default Title;