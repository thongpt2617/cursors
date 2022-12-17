import { useEffect, useState, MouseEventHandler } from "react";
import { motion, Variants } from "framer-motion";
import "./App.css";

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");

  const cursorVariants: Variants = {
    default: {
      left: mousePosition.x - 48,
      top: mousePosition.y - 32,
    },
    text: {
      left: mousePosition.x - 75,
      top: mousePosition.y - 75,
      height: 150,
      width: 150,
      backgroundColor: "yellow",
      mixBlendMode: "difference",
      transition: {
        type: "spring",
      },
    },
  };

  const textVariants: Variants = {
    hidden: {
      opacity: 0,
      marginLeft: -25,
    },
    show: {
      opacity: 1,
      marginLeft: 0,
      transition: {
        type: "spring",
      },
    },
  };

  const titleVariants: Variants = {
    hidden: {
      opacity: 0,
    },
    show: (i = 1) => ({
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: i * 0.15,
      },
    }),
  };

  const handleMouseEnter: MouseEventHandler = () => {
    setCursorVariant("text");
  };
  const handleMouseLeave: MouseEventHandler = (e) => {
    setCursorVariant("default");
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const renderAnimatedText = (text: string) => {
    return Array.from(text).map((letter, index) => (
      <motion.span variants={textVariants} key={index} className="character">
        {letter}
      </motion.span>
    ));
  };

  return (
    <div className="App">
      <section className="section">
        <motion.h1
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="title"
          variants={titleVariants}
          initial="hidden"
          whileInView="show"
        >
          {renderAnimatedText("Thong Phan")}
        </motion.h1>
        <motion.div
          className="cursor"
          variants={cursorVariants}
          animate={cursorVariant}
          transition={{ ease: "easeOut", duration: 0.1 }}
        />
      </section>
    </div>
  );
}

export default App;
