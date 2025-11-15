import bgImage from '../assets/bgimage.jpg';

const NewsletterBox = () => {
    const onSubmitHandler = (event) => {
        event.preventDefault();
    };

    return (
        <div
            className='text-center bg-cover bg-center  bg-red-700 bg-no-repeat py-28 px-4'
            style={{ backgroundImage: `url(${bgImage})` }}
        >
            <div className='bg-white/80 backdrop-blur-sm max-w-2xl rounded-2xl p-6 ml-6 shadow-lg'>
                <p className='text-2xl font-medium text-gray-800'>
                    Subscribe now & get 20% off
                </p>
                <p className='text-gray-600 mt-3'>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                </p>
                <form
                    onSubmit={onSubmitHandler}
                    className='w-full flex flex-col sm:flex-row items-center gap-3 mt-6 border rounded-lg overflow-hidden'
                >
                    <input
                        className='w-full sm:flex-1 px-4 py-3 outline-none text-gray-700'
                        type='email'
                        placeholder='Enter your email'
                        required
                    />
                    <button
                        type='submit'
                        className='bg-[#bd4a53] text-white text-xs font-semibold px-10 py-4'
                    >
                        SUBSCRIBE
                    </button>
                </form>
            </div>
        </div>
    );
};

export default NewsletterBox;
