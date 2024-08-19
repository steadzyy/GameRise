function formatRupiah(price = 0){
    // console.log(price);
    return price.toLocaleString("id-ID", {style: "currency", currency: "IDR"})

}

export default formatRupiah 