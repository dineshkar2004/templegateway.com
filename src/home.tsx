import { Helmet } from "react-helmet-async";

const Home = () => {
    return (
        <>
            <Helmet>
                <title>Temple Gateway | Book Temple Darshan & Pooja Online</title>
                <meta
                    name="description"
                    content="Temple Gateway helps devotees book temple darshan, pooja, and rituals online across India. Trusted temples, easy booking."
                />
                <meta
                    name="keywords"
                    content="temple darshan booking, online pooja, temple services, hindu temples"
                />

                {/* Open Graph */}
                <meta property="og:title" content="Temple Gateway" />
                <meta
                    property="og:description"
                    content="Book temple darshan & pooja services online across India."
                />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://templegateway.in" />
            </Helmet>

            <h1>Book Temple Darshan & Pooja Services Online</h1>

            <p>
                Temple Gateway is a trusted platform for booking temple darshan, pooja,
                and rituals across India. We partner with verified temples to bring
                spirituality online.
            </p>
        </>
    );
};

export default Home;
