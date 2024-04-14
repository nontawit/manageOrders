import {Carousel} from "react-bootstrap";
import Card from 'react-bootstrap/Card';

function CarouselCard({ orders }){
    return(
        <Carousel>
            {orders.map(order => (
                <Carousel.Item key={order._id}>
                    <Card style={{ width: '18rem', margin: "auto" }}>
                        <h3>ลูกค้า: {order.cusName}</h3>
                        <p>ที่อยู่: {order.cusAddress}</p>
                        <p>{order.orderUnit} ชุด</p>
                        <p> ส่ง: {order.dateDelivery}</p>
                        <p>สถานะ: {order.orderStatus}</p>    
                        {order.orderDate}
                    </Card>
                </Carousel.Item>
            ))}
        </Carousel>
    );
}

export default CarouselCard;