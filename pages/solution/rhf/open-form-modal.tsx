import React, {useCallback, useState} from 'react';
import {useForm} from 'react-hook-form';

/**
 * URL: http://localhost:3000/solution/rhf/open-form-modal
 * 모달 띄울 때 기본값 쉽게 셋팅하기 (수정폼이 별도페이지로 있는경우 못쓰는전략이고, 모달인경우에만 유효함)
 * 
 * 핵심 : 폼 기본값 셋팅(모달에서)을 setValue가 아닌 defaultValue로 하는것
 * 
 * 1. 생성모달 띄울때는 폼 기본값을 지정해주고
 * 2. 수정모달인 안에서 useEffect에서 setValue 잔뜩 얻어와서 일일히 기본값 잔뜩 셋팅하는거 안해도됨.
 */
export default function Page() {
  const [modalData, setModalData] = useState<ModalFormData>();

  const openCreateModal = useCallback(() => {
    setModalData(DEFAULT_FORM_DATA);
  }, []);

  const openUpdateModal = useCallback((address: Address) => {
    setModalData(address)
  }, []);

  return (
    <>
      <button onClick={openCreateModal}>배송지 등록</button>
      <div>
        {addressList.map(address => (
          <button key={address.pk} onClick={() => openUpdateModal(address)}>배송지수정</button>
        ))}
      </div>
      {!modalData ? null : (
        <AddressModal data={modalData}/>
      )}
    </>
  );
}

const addressList: Address[] = [];

interface ModalProps {
  data: ModalFormData;
}

interface ModalFormData extends Omit<Address, 'pk'> {
  pk: undefined | number;
}

const DEFAULT_FORM_DATA: ModalFormData = {
  pk: undefined,
  receiverName: ''
};

function AddressModal({data}: ModalProps) {
  const {} = useForm<ModalFormData>({
    defaultValues: data
  });

  return null;
}

interface Address {
  pk: number;
  receiverName: string;
}
