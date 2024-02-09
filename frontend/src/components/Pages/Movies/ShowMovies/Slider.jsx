import { useState, useEffect, useRef } from "react";
import { MoviesData } from "../../../../data/MoviesData";
import { ChevronLeft, ChevronRight } from "lucide-react";

const screenWidth=window.innerWidth;
function Slider() {
    const [movieList, setMovieList] = useState([])
    const elementRef = useRef();

    // console.log(movieList);

    useEffect(()=> {
        getTrendingMovies();
    },[])


    const getTrendingMovies = () => {
        setMovieList(MoviesData);
    }

    const sliderRight = (element) => {
        element.scrollLeft += screenWidth - 412
    };

    const sliderLeft = (element) => {
        console.log(Element)
        element.scrollLeft -= screenWidth - 412
    };

    return (
        <div className="relative">
        <ChevronLeft className="hidden md:block text-white text-[30px] absolute mx-10 mt-[155px] cursor-pointer"
        onClick={()=>sliderLeft(elementRef.current)}/>
        <ChevronRight className="hidden md:block text-white text-[30px] absolute mx-10 mt-[155px] cursor-pointer right-0"
        onClick={()=>sliderRight(elementRef.current)}/>
    
        <div className="flex overflow-x-auto w-full px-8 md:px-16 lg:px-16 py-4 scrollbar-none scroll-smooth" 
        ref={elementRef} >
            {movieList.map((item, index) => (
                <img key={index} src={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`}
                className="min-w-full md:h-[350px] object-cover objct-left-top 
                mr-5 rounded-md hover:border-[4px] border-blue-400 
                transition-all duration-100 ease-in"/>
            ))
        }
        </div>
    </div>
  )
}

export default Slider;