"use client";

import { useState, useTransition } from "react";
import { Card, Tag, Button, Popconfirm, App } from "antd";
import { LinkOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { CompanyWithStats } from "@/lib/data/companies";
import { STATUS_CONFIG } from "@/lib/status-config";
import { getCompanyColor } from "@/lib/format";
import { deleteCompany } from "@/actions/companies";
import CompanyModal from "./CompanyModal";

interface CompanyCardProps {
  company: CompanyWithStats;
}

const MAX_VISIBLE_STATUSES = 3;

function CompanyCard({ company }: CompanyCardProps) {
  const { message } = App.useApp();
  const [editing, setEditing] = useState(false);
  const [isPending, startTransition] = useTransition();
  const avatarColor= getCompanyColor(company.name);
  const visibleStatuses= company.statuses.slice(0, MAX_VISIBLE_STATUSES);
  const hiddenCount= company.statuses.length - MAX_VISIBLE_STATUSES;

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteCompany(company.id);
      if (result?.error) message.error(result.error);
    });
  };

  const handleCloseModal = () => setEditing(false)
  const handleOnStartEdit = () => setEditing(true)

  return (
    <>
      <CompanyModal open={editing} onClose={handleCloseModal} company={company} />

      <Card
        loading={isPending}
        styles={{ body: { padding: 16 } }}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-3 min-w-0">
            <div
              className="w-10 h-10 rounded-xl shrink-0 flex items-center justify-center text-white text-sm font-bold"
              style={{ backgroundColor: avatarColor }}
            >
              {company.name[0].toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-sm truncate">{company.name}</p>
              {company.website ? (
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-indigo-500 hover:text-indigo-600 flex items-center gap-1 truncate"
                >
                  <LinkOutlined />
                  {company.website.replace(/^https?:\/\//, "")}
                </a>
              ) : (
                <p className="text-xs text-gray-400">No website</p>
              )}
            </div>
          </div>

          <div className="flex gap-0.5 shrink-0">
            <Button
              type="text"
              icon={<EditOutlined />}
              size="small"
              onClick={handleOnStartEdit}
            />
            <Popconfirm
              title="Delete company?"
              description="Companies with linked applications cannot be deleted."
              onConfirm={handleDelete}
              okText="Delete"
              okButtonProps={{ danger: true }}
              cancelText="Cancel"
            >
              <Button type="text" danger icon={<DeleteOutlined />} size="small" />
            </Popconfirm>
          </div>
        </div>

        <div className="border-t border-gray-100 mb-3" />

        {/* Footer */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span className="text-xs text-gray-500">
            {company.applicationCount} application{company.applicationCount !== 1 ? "s" : ""}
          </span>

          {company.statuses.length === 0 ? (
            <span className="text-xs text-gray-400">No applications</span>
          ) : (
            <div className="flex gap-1 flex-wrap justify-end">
              {visibleStatuses.map((status) => (
                <Tag
                  key={status}
                  color={STATUS_CONFIG[status].tagColor}
                  style={{ fontSize: 11, padding: "0 6px", lineHeight: "18px", marginRight: 0 }}
                >
                  {STATUS_CONFIG[status].label}
                </Tag>
              ))}
              {hiddenCount > 0 && (
                <Tag style={{ fontSize: 11, padding: "0 6px", lineHeight: "18px", marginRight: 0 }}>
                  +{hiddenCount}
                </Tag>
              )}
            </div>
          )}
        </div>
      </Card>
    </>
  );
}

export default CompanyCard;
