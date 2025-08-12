<template>
  <aside className="w-80 text-white p-5 mt-custom_top">
    <ul className="">
      <li className="rounded-md cursor-pointer hover:opacity-80 mr-0.5">
        <a
          href="/admin"
          className="text-custom-grey font-semibold flex items-center"
        >
          <img
            src="/user.svg"
            class="w-5 h-5 mr-3"
            alt=""
          />
          Manage Users
        </a>
      </li>
      <li className="mt-8 rounded-md cursor-pointer hover:opacity-80 mr-0.5">
        <a
          href="/admin/manage-category"
          className="text-custom-grey font-semibold flex items-center"
        >
          <img
            src="/cate.svg"
            alt=""
            className="w-5 h-5 mr-3"
          />
          Manage Categories
        </a>
      </li>
      <li className="mt-8 rounded-md cursor-pointer hover:opacity-80 mr-0.5">
        <a
          href="/admin/manage-campaign"
          className="text-custom-grey font-semibold flex items-center"
        >
          <img
            src="/campaign.svg"
            alt=""
            className="w-5 h-5 mr-3"
          />
          Manage Campaign
        </a>
      </li>
      <li className="mt-8 rounded-md cursor-pointer hover:opacity-80 mr-0.5">
        <a
          href="/admin/view-donations"
          className="text-custom-grey font-semibold flex items-center"
        >
          <img
            src="/donation.svg"
            alt=""
            className="w-5 h-5 mr-3"
          />
          View Donations
        </a>
      </li>
    </ul>
  </aside>
</template>

<script setup></script>
