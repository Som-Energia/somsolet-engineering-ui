import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const ProjectsFilters = ({ data, onFilterChange, filtering }) => {
  return (
    <div>
      {data.map((filter) => (
        <FormControl key={filter.id} sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id={filter.id}>{filter.label}</InputLabel>
          <Select
            labelId={filter.id}
            id={filter.id}
            value={filtering ? filtering[filter.id] : null}
            label={filter.label}
            onChange={(e) => onFilterChange({ [filter.id]: e.target.value })}
          >
            <MenuItem value={null}>
              <em>{filter.label}</em>
            </MenuItem>
            {filter.values.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ))}
    </div>
  );
};

export default ProjectsFilters;
