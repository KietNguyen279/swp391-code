import "../../assets/css/style.css"
import "../../assets/css/bootstrap.css"
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Footer from '../Footer';
import { Image } from "@mui/icons-material";

const URL = 'https://66e9e19287e41760944afe0c.mockapi.io/blog';
const initialState = {
  title: '',
  content: '',
  date_published: '',
  image: Math.floor(Date.now() / 1000)
}



const ReadBlog = () => {
  const { id } = useParams();

  const [state, setState] = useState(initialState);


  const getOneBlog = async (id) => {
    const res = await axios.get(`${URL}/${id}`);
    if (res.status === 200) {
      setState(res.data);
    }
  }

  useEffect(() => {
    if (id) getOneBlog(id);
  }, [id]);


  return (
    <div>
      <div className='container'>
        <div className="main_fck_detail">
          <div className="blog_title_detail">
            <div className="bg_title_post">
              <h1 className="title_posty">Durian prices drop up to 30%</h1>
            </div>
          </div>

        </div>
        <div className="author">
          By <a href="javascript:void(0)">Thi Ha</a>&nbsp; &nbsp;September 30, 2024 | 06:13 am GMT+7
        </div>
        <div className="image_blog">
          <img src=""></img>
        </div>
        <p>
          Minh Thanh, a farmer in the Central Highlands province of Dak Lak, hopes that durian prices will recover by the
          season’s end. However, prolonged heavy rains have compromised the fruit’s quality, leading to low selling prices
          at the garden. Similarly, Hong Anh, owner of 0.5-hectare crop in the Central Highlands province of Gia Lai,
          encounters challenges as buyers rescind their offers of VND80,000 per kilogram,
          even forfeiting deposits, compelling her to sell at only VND65,000 due to poor quality. Anh attributes the price
          drop to the fruit’s diminished quality from excessive rainfall, particularly in new orchards that lack proper cultivation techniques.
          The hardened fruits complicate exports, with most being consumed domestically. Manh Hoang, a trader in the Central
          Highlands, observes that durian quality suffers when grown alongside pepper and coffee. As the prices for pepper and coffee increase,
          many farmers prioritize them and apply unregulated fertilization, which degrades the durian quality. Some buyers only purchase durian
          for use in ice cream or for extracting the pulp, further complicating the export of whole fruits. "I buy a few tons
          each day, but only 50% of the fruits meet export standards," says Hoang. "The rest are sold in HCMC, Hanoi, and Da Nang."
          The General Department of Vietnam Customs reports that in the first seven months of 2024, Vietnam exported 476,130 tons of durian,
          valued at US$1.6 billion, representing a 50.5% increase in volume and 49.4% increase in value compared to the same period last year.
          However, July saw a 30.8% decrease in both value and volume compared to June,
          totaling only US$280 million. Exports further declined to US$200 million in August.
          Despite weather-related slowdowns, businesses note that durian export demand from China is recovering due to festive occasions.
          Improved weather from October is anticipated to enhance the quality of durian. Additionally, the volume of off-season produce has
          increased potentially, increasing export turnover.
        </p>
        <Footer />
      </div>
    </div>
  )
}

export default ReadBlog;