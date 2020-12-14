import React, { useEffect } from 'react';
import { useQueryParam, NumberParam } from 'use-query-params';
import { useCollectionContext } from '../../../contexts';
import { getRems, media } from '../../../styles';
import {
  styled,
  Page,
  Row,
  Col,
  Heading,
  Paragraph,
  Small,
  OutlineButton,
} from '../shared';
import Loader from './Loader';
import { SlideProvider, SlideToggle, Slide } from './slide';
import { useFilterState, Filters } from './filter';
import List from './List';
import Modal from './Modal';
import { FilterSvg } from '../../svg';
import { HEADING_WRAPPER_MARGIN_BOTTOM_PX } from './constants';

/*
 *  TODO:
 *    - back to top
 *    - add to collection link
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const checkIsOutsideClick = (event: any) => {
  // prevents react select clear indicator triggering slide outside click
  const isReactSelectClearIndicator = event.target.classList.contains(
    'react-select__clear-indicator'
  );
  const isReactSelectClearIndicatorSvg = event.target.parentElement?.classList.contains(
    'react-select__clear-indicator'
  );
  const isReactSelectClearIndicatorSvgPath = event.target.parentElement?.parentElement?.classList.contains(
    'react-select__clear-indicator'
  );
  return (
    !isReactSelectClearIndicator &&
    !isReactSelectClearIndicatorSvg &&
    !isReactSelectClearIndicatorSvgPath
  );
};

const getCount = (all: number, filtered: number): string => {
  if (all === filtered) return `${all} pieces`;
  return `${filtered} of ${all} pieces`;
};

export const Collection: React.FC = () => {
  /*
   *  collection
   */
  const {
    collectionIsLoading,
    collection,
    loadCollection,
  } = useCollectionContext();

  useEffect(() => {
    // load collection if it hasn't been loaded already
    if (!collectionIsLoading && !collection) loadCollection();
  }, [collectionIsLoading, collection, loadCollection]);

  /*
   *  filters
   */
  const {
    filters,
    filteredCollection,
    filterProps,
    resetFilters,
  } = useFilterState(collection || []);

  /*
   *  modal
   */
  const [modalId, setModalId] = useQueryParam('id', NumberParam);

  return (
    <Page title="Collection">
      <Row>
        <Col md={12}>
          {(() => {
            if (collectionIsLoading || !collection)
              return (
                <>
                  <Heading className="mb-4">Collection</Heading>
                  <Loader />
                </>
              );

            const count = getCount(
              collection.length,
              filteredCollection.length
            );

            return (
              <SlideProvider checkIsOutsideClick={checkIsOutsideClick}>
                <HeadingWrapper>
                  <Heading className="mb-0">Collection</Heading>
                  <HeadingCount>{count}</HeadingCount>
                </HeadingWrapper>
                <SlideToggleWrapper>
                  <SlideToggle
                    openLabel="Open filters"
                    closeLabel="Close filters"
                  >
                    <FilterIcon />
                  </SlideToggle>
                </SlideToggleWrapper>
                <Slide closeLabel="Close filters">
                  <SlideCount>{count}</SlideCount>
                  <Filters
                    collection={collection}
                    filteredCollection={filteredCollection}
                    filters={filters}
                    reset={resetFilters}
                    {...filterProps}
                  />
                </Slide>
                <List
                  filteredCollection={filteredCollection}
                  onItemClick={(nextmodalId) => setModalId(nextmodalId)}
                  noItems={
                    <div className="text-center">
                      <Paragraph color="gray" className="mt-2">
                        No pieces matches your current filter selections.
                      </Paragraph>
                      <OutlineButton onClick={resetFilters}>
                        Reset
                      </OutlineButton>
                    </div>
                  }
                />
                <Modal
                  filteredCollection={filteredCollection}
                  id={modalId}
                  setId={setModalId}
                />
              </SlideProvider>
            );
          })()}
        </Col>
      </Row>
    </Page>
  );
};

const HeadingWrapper = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: ${HEADING_WRAPPER_MARGIN_BOTTOM_PX}px;
  position: relative;
`;

const HeadingCount = styled(Small).attrs({ color: 'gray' })`
  left: 8px;
  position: absolute;
  top: 48px;
`;

const SlideToggleWrapper = styled.div`
  position: absolute;
  right: 15px;
  top: 7px;

  ${media.sm`
    right: 0;
    top: 14px;
  `}
`;

const FilterIcon = styled(FilterSvg)`
  height: ${getRems(20)};
`;

const SlideCount = styled(Small).attrs({ color: 'gray' })`
  position: absolute;
  right: 10px;
  top: 8px;

  ${media.md`
    display: none;
  `}
`;
