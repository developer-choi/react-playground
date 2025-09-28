import styles from '@/app/(example)/markup/module/active-link/[...path]/page.module.scss';
import {ActiveLink} from '@forworkchoe/core/components';
import React from 'react';
import {H2} from '@/components/element/typography';

/**
 * URL : http://localhost:3000/markup/module/active-link/community
 * Doc : [Active Link] https://docs.google.com/document/d/1FmklHJmf9oTMpfqTxHReefj8iSXqphABXP1yoq2nh8M/edit
 * href에 pathname을 적어도 안적어도 잘 동작하는거 테스트 + path mode
 */
export default function Page() {
  return (
    <>
      <div>
        <H2>startsWith mode 1</H2>
        <div className={styles.simpleTab}>
          <ActiveLink className={styles.link} href={`${prefixPath}/community`} active="startsWith">Community</ActiveLink>
          <ActiveLink className={styles.link} href={`${prefixPath}/mypage`} active="startsWith">Mypage</ActiveLink>
        </div>
        <ActiveLink className={styles.link} href={`${prefixPath}/community/free-board/1`} active="startsWith">Community 하위</ActiveLink>
        <ActiveLink className={styles.link} href={`${prefixPath}/mypage/change-password`} active="startsWith">Mypage 하위</ActiveLink>
      </div>

      <div>
        <H2>exact mode 1</H2>
        <div className={styles.simpleTab}>
          <ActiveLink className={styles.link} href={`${boardListHref}?sort=desc`} active="exact">desc</ActiveLink>
          <ActiveLink className={styles.link} href={`${boardListHref}?sort=asc`} active="exact">asc</ActiveLink>
        </div>
      </div>

      <div>
        <H2>exact mode 2</H2>
        <div className={styles.simpleTab}>
          <ActiveLink className={styles.link} href="?sort=desc" active="exact">desc</ActiveLink>
          <ActiveLink className={styles.link} href="?sort=asc" active="exact">asc</ActiveLink>
        </div>
      </div>

      <div>
        <H2>Manual</H2>
        <ActiveLink className={styles.link} href="?sort=desc" active>desc</ActiveLink>
        <ActiveLink className={styles.link} href="?sort=asc" active={false}>asc</ActiveLink>
      </div>
      <div>
        <H2>Special Character</H2>
        {SEARCH.map(search => (
          <ActiveLink key={search} className={styles.link} href={`?search=${search}`} active="exact">{search}</ActiveLink>
        ))}
      </div>
    </>
  );
}

const prefixPath = '/markup/module/active-link';

const boardListHref = '/markup/module/active-link/exact';

/** 들어가면 안되는거 (문법오류)
 * # (해쉬)
 * % (특수문자 인코딩할 때 쓰는 값)
 * & (쿼리스트링 간에 구분할 때 쓰는 값)
 */
const SEARCH = [
  'english',
  '사이 공백',
  'between blank',
  'p+lus',
  'specialcharacter',
  '`s!p@e$c^i*a(l)c-h_a+r|a[c]t{e}r<>,./?'
];
