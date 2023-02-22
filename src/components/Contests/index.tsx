import React, { useRef } from "react";

import Banner from "./Banner";
import ContestList from "./Cards";
import Table from "./Table";
import Modal from "./ContestModalWrapper";
import ModalContent from "./ContentModal";

const Contests = (): JSX.Element => {
  const modalRef = useRef(null);

  const handleOpenClick = () => modalRef.current?.openModal();
  const handleCloseClick = () => modalRef.current?.closeModal();

  return (
    <>
      <div className="flex justify-between">
        <h1 className="font-medium text-base lg:text-3xl">Ongoing Contests</h1>
        <div>Sort by: End date</div>
      </div>
      <Banner onClick={handleOpenClick} />
      <ContestList />
      <div className="mt-14">
        <h2 className="font-medium text-base lg:text-3xl mb-12">
          Recent Contests
        </h2>
        <Table />
      </div>
      <Modal ref={modalRef}>
        <ModalContent onClick={handleCloseClick} />
      </Modal>
    </>
  );
};

export default Contests;
