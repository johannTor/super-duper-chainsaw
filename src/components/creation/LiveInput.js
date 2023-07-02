import React from 'react'
import { SectionContainer, SectionHeader } from '../styles/style'
import styled from 'styled-components';
import PropTypes from 'prop-types';

const LifeSelect = styled.select`
  padding: 1rem 1rem;
  font-size: 18px;
  font-weight: 500;
`;

export default function LiveInput({ setLifeCount }) {
  return (
    <SectionContainer>
      <SectionHeader>Lives per square</SectionHeader>
      <LifeSelect onChange={(ev) => setLifeCount(+ev.target.value)}>
        <option value="2">2</option>
        <option value="3">3</option>
      </LifeSelect>
    </SectionContainer>
  )
}

LiveInput.propTypes = {
  setLifeCount: PropTypes.func.isRequired,
}
