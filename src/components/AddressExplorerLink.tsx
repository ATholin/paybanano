const DepositAccountInformation = (props) => {
    return (
        <div className="truncate max-w-xs">
            <a title={props.account ?? props.block} target="_blank" className="underline" rel="noreferrer" href={`https://creeper.banano.cc/explorer/${props.account ? "account" : "block"}/${props.account ?? props.block}`}>{props.account ?? props.block}...</a>
        </div>
    )
};

export default DepositAccountInformation;