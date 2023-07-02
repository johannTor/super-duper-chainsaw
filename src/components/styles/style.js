import styled from 'styled-components';

export const SectionHeader = styled.h1`
  font-size: 32px;
`;

export const SectionContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

export const ToggleButton = styled.button`
  border: none;
  font-size: 16px;
  font-weight: 600;
  padding: 1rem 2rem;
  background-color: ${({ selected }) => !selected && 'rgba(240, 240, 240, 0.5)'};
  outline: ${({ selected }) => selected && '2px solid #fff'};
  cursor: ${({ selected }) => selected ? 'default' : 'pointer'};
  box-shadow: ${({ selected }) => selected && '0px 32px 100px 0px #fff'};
  &:active {
    transform: ${({ selected }) => !selected && 'scale(0.96)' };
  }
  &:disabled {
    background-color: ${({ selected }) => selected && 'rgba(240, 240, 240, 1)'};
    color: #000;
  }
`;

export const GeneralButton = styled.button`
  border: none;
  font-size: 16px;
  font-weight: 600;
  padding: 1rem 2rem;
  cursor: pointer;
  box-shadow: ${({ disabled }) => !disabled && '0px 32px 100px 0px #fff'};
  &:active {
    transform: ${({ disabled }) => !disabled && 'scale(0.96)'};
  }
  &:disabled {
    background-color: ${({ disabled }) => disabled && 'rgba(240, 240, 240, 0.5)'};
    color: #000;
  }
`;

export const WinnerModal = styled.dialog`
  padding: 1rem;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
  background: #fff;
  border-radius: 0.25rem;
`;

export const ModalHeading = styled.h1`
  font-size: 64px;
  font-weight: 600;
  text-align: center;
  padding-bottom: 1rem;
`;