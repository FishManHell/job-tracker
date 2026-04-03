"use client";

import { useState } from "react";
import { Input, Empty } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import type { CompanyWithStats } from "@/lib/data/companies";
import CompanyCard from "./CompanyCard";

interface CompaniesGridProps {
  companies: CompanyWithStats[];
}

function CompaniesGrid({ companies }: CompaniesGridProps) {
  const [search, setSearch] = useState("");

  const filtered = search
    ? companies.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()))
    : companies;

  return (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="Search companies..."
        prefix={<SearchOutlined className="text-gray-400" />}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        allowClear
        style={{ maxWidth: 320 }}
      />

      {filtered.length === 0 ? (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={search ? "No companies match your search." : "No companies yet."}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>
      )}
    </div>
  );
}

export default CompaniesGrid;
