import ClassRow from "./classRows";

const ClassListView = ({ filteredClasses }) => {
  return (
    <>
      {filteredClasses.map((student, index) => (
        <ClassRow key={Math.random()} myClass={student} />
      ))}
    </>
  );
};

export default ClassListView;
