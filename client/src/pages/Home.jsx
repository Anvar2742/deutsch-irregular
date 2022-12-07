import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { json, Link } from "react-router-dom";
import catUrl from "../assets/gifs/cat.gif";
import { practiseItemsArr } from "../assets/constants";
import * as Icon from "react-bootstrap-icons";

const Home = () => {
    const [practiseElements, setPractiseElements] = useState(
        localStorage.getItem("practiseModes")
            ? JSON.parse(localStorage.getItem("practiseModes"))
            : practiseItemsArr
    );
    const buttonRef = useRef(null);
    const updateMode = (event, currentItem) => {
        if (
            event.target === buttonRef.current ||
            buttonRef.current.contains(event.target)
        ) {
            event.preventDefault();
            setPractiseElements((prevElements) => {
                return prevElements.map((el) => {
                    if (el.to === currentItem.to) {
                        const currentMode =
                            el.mode === 20
                                ? -1
                                : el.mode === -1
                                ? 10
                                : el.mode * 2;
                        return {
                            ...el,
                            mode: currentMode,
                        };
                    } else {
                        return el;
                    }
                });
            });
        }
    };
    useEffect(() => {
        localStorage.setItem("practiseModes", JSON.stringify(practiseElements));
    }, [practiseElements]);
    return (
        <div className="p-4 grid grid-cols-2 grid-rows-2 gap-4 h-full">
            {practiseElements.map((item) => {
                if (item.isDone) {
                    return (
                        <Link
                            to={item.to}
                            key={item.to}
                            onClick={(event) => updateMode(event, item)}
                            className="flex text-3xl items-center justify-center rounded-2xl shadow-card relative"
                        >
                            <button
                                ref={buttonRef}
                                className="absolute right-3 bottom-3 flex items-center justify-center text-xl text-white bg-primary rounded-full h-9 w-[calc(37px)]"
                            >
                                {item.mode === -1 ? (
                                    <Icon.Infinity className="mt-[1px]" />
                                ) : (
                                    item.mode
                                )}
                            </button>
                            <span className="capitalize">{item.name}</span>
                        </Link>
                    );
                } else {
                    return (
                        <Link
                            to="/"
                            key={item.to}
                            className="flex text-3xl items-center justify-center rounded-2xl shadow-card overflow-hidden"
                        >
                            <img
                                src={catUrl}
                                className="h-full w-full object-cover"
                                alt=""
                            />
                        </Link>
                    );
                }
            })}
        </div>
    );
};

export default Home;
