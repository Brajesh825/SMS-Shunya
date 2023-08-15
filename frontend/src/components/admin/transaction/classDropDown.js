import Select from "react-select";

const ClassDropDown = ({ setActiveClass, classes, activeClass }) => {

  const classList = [];
  if (classes) {
    classList.push({
      value: classes._id,
      label: classes.className,
    });
  }

  const handleChange = (e) => {
    if (setActiveClass) {
      setActiveClass(e.value)
    }
  }


  return (
    <Select
      onChange={handleChange}
      name="class"
      options={classList}
    />
  );

};

export default ClassDropDown;
