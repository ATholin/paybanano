const Footer = () => {
    const donationAddress = process.env.NEXT_PUBLIC_DONATION_ADDRESS

    return (
        <footer className="mt-4 text-sm text-gray-500 text-center truncate">
            { donationAddress && (
                <span className="space-x-1">
                    <span>Donate:</span>
                    <a href={`banano:${donationAddress}`} className="text-yellow-500 truncate">{donationAddress}</a>
                </span>
            )}

        </footer>
    )
};

export default Footer;