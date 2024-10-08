

const ProducDetail = () => {
    return (
        <div>
            <div className='container'>
                <div className="hd-pd">
                    <h1>Product Detail</h1>
                </div>
                <div className="row g-0 text-center">
                    <div className="col-6 ">
                        <div className='img-product'>
                            <img src="../../assets/image/z5692706249714_db9b481d98c3828380bbb9e57063ea82.jpg"></img>
                        </div>
                    </div>
                    <div className="col-sm-6 text-left">
                        <div className="clearfix">
                            <h3 className="product_title entry-title">Pro Clear 55w UV Unit</h3>
                            <div >
                                <p className="price">
                                    Price:
                                </p>
                                <p className="product-enquiry-button-custom">
                                    <a data-title="Pro Clear 55w UV Unit" data-id="17958"
                                    className="product-enquiry-click click-link-btn product-btn-17958" href="">
                                    <button>
                                    Add to Cart
                                    </button>
                                    </a>
                                </p>
                            </div>
                            <div className="product_meta">
                                <span className="posted_in">Category: <a
                                    href="https://koihealthandpondcare.co.uk/product-category/pond-equipment/" rel="tag">Pond
                                    Equipment</a></span>
                                <div className="social_share_list_holder"><span>Share on: </span>
                                    <ul>
                                        <li className="facebook_share"><a title="Share on Facebook" href="#"><i className="fa fa-facebook"></i></a></li>
                                        <li className="twitter_share"><a href="#" title="Share on Twitter"><i className="fa fa-twitter"></i></a></li>
                                        <li className="google_share"><a href="#" title="Share on Google+"><i className="fa fa-google-plus"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProducDetail;