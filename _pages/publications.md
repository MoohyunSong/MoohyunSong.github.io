---
layout: page
permalink: /publications/
title: publications
description:
nav: true
nav_order: 2
---

<!-- _pages/publications.md -->

**10 publications** (4 international conferences, 1 domestic journal, 5 domestic conferences)

{% include bib_search.liquid %}

<!-- ## International Journal

<div class="publications">
{% bibliography --query @article[keywords=international] %}
</div> -->

## International Conference

<div class="publications">
{% bibliography --query @inproceedings[keywords=international] %}
</div>

## Domestic Journal

<div class="publications">
{% bibliography --query @article[keywords=domestic] %}
</div>

## Domestic Conference

<div class="publications">
{% bibliography --query @inproceedings[keywords=domestic] %}
</div>
